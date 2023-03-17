DROP VIEW message_queue_decoded_mv;
DROP VIEW messages_mv;
DROP TABLE messages_queue_decoded;
DROP TABLE messages_queue;
DROP TABLE messages;

CREATE TABLE messages (
  col1 UInt32,
  col2 UInt32
) ENGINE = MergeTree  ORDER BY col1;

CREATE TABLE messages_queue (
  value String
)
ENGINE = Kafka('broker:29092', 'messages', 'ch-messages', 'MsgPack')
settings
    kafka_thread_per_consumer = 0,
    kafka_num_consumers = 1;

CREATE TABLE messages_queue_decoded (
  value String,
) ENGINE = Memory;

CREATE MATERIALIZED VIEW message_queue_decoded_mv TO messages_queue_decoded as SELECT * from messages_queue FORMAT MsgPack;

drop view json_mv2;

CREATE MATERIALIZED VIEW messages_mv TO messages AS
SELECT
    JSONExtract(value, 'col1', 'Int32') AS col1,
    JSONExtract(value, 'col2', 'Int32') AS col2
FROM messages_queue FORMAT MsgPack
