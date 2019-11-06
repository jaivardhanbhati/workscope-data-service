
CREATE SEQUENCE SEQ_WORKSCOPE_AUDIT_ID;

CREATE TABLE WORKSCOPE_AUDIT
(
  ID BIGINT DEFAULT nextval('SEQ_WORKSCOPE_AUDIT_ID') PRIMARY KEY NOT NULL,
  WORKSCOPE_ID BIGINT NOT NULL,
  WORKSCOPE_VERSION BIGINT NOT NULL,
  USER_ACTION VARCHAR(255),
  MODIFIED_BY VARCHAR(255),
  MODIFIED_DATE TIMESTAMP
 );

ALTER TABLE WORKSCOPE_AUDIT ADD FOREIGN KEY (WORKSCOPE_ID, WORKSCOPE_VERSION) REFERENCES WORKSCOPE (ID, VERSION);
