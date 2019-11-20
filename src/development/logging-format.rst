.. _`SKA Log Message Format`:

SKA Log Message Format
**********************

Logging Levels
==============
The log format should correspond to the default Python logging levels.

Typically, a Python log message consists of two bits of information from the perspective of calling `log` function in code:

1.  Log level - corresponds to the Python standard logging levels
2.  Message - a UTF-8 encoded string

The logging levels used can be any one of the five standard Python logging levels. For other language runtimes, the appropriate level that corresponds to the RFC5424 standard should be used.

.. note:: The Syslog RFC is used as a reference format for mapping log levels only. The `Log Message Standard`_ does not conform to RFC5424 and is not an extension of syslog. For reasoning behind this, see `Design Motivations`_ section.

Mapping of Logging Levels
-------------------------

The table below maps Python logging levels to that of `RFC5424 <https://tools.ietf.org/html/rfc5424>`_ (syslog).

::

    (This table is inside a block quote because when HTML is viewed in browser,
    the table content gets replaced by a list of repositories.)

    ======== ============= ====================== =====================
    Python   RFC5424       RFC5424 Numerical Code Your language runtime
    ======== ============= ====================== =====================
    DEBUG    Debug         7                      ?
    INFO     Informational 6                      ?
    WARNING  Warning       4                      ?
    ERROR    Error         3                      ?
    CRITICAL Critical      2                      ?
    ======== ============= ====================== =====================

For guidelines on when to use a particular log level, please refer to the `official Python logging HOWTO <https://docs.python.org/3/howto/logging.html>`_.

Log Message Standard
====================

All processes that execute inside containers **must** log to *stdout*.

In order for log messages to be ingested successfully into the logging system once deployed, the log message should conform to the following format (in ABNF):

::

  SKA-LOGMSG = VERSION "|" TIMESTAMP "|" SEVERITY "|" [THREAD-ID] "|" [FUNCTION] "|" [LINE-LOC] "|" [TAGS] "|" MESSAGE LF
  VERSION    = 1*2DIGIT                                                   ; (compulsory) version of SKA log standard this log message implements - starts at 1
  TIMESTAMP  = FULL-DATE "T" FULL-TIME                                    ; (compulsory) ISO8601 compliant timestamp normalised to UTC
  THREAD-ID  = *32("-" / ALPHA / DIGIT)                                   ; (optional) thread id, e.g. "MainThread" or "Thread-1"
  FUNCTION   = *(NAMESPACE ".") *ALPHA                                    ; (optional) full namespace of function, e.g. package.module.TangoDevice.method
  LINE-LOC   = FILENAME "#" LINENO *" "                                   ; (optional) file and line where log was called
  SEVERITY   = ("DEBUG" / "INFO" / "WARNING" / "ERROR" / "CRITICAL") *" " ; (compulsory) log level/severity
  TAGS       = TAG *[ "," TAG ]                                           ; (optional) comma-separated list of tags e.g. facility:MID,receptor:m043
  MESSAGE    = *OCTET                                                     ; message content (UTF-8 string) (should we think about constraining length?)
  FILENAME   = 1*64 (ALPHA / "." / "_" / "-" / DIGIT)                     ; from 1 up to 64 characters
  LINENO     = 1*5DIGIT                                                   ; up to 5 digits (hopefully no file has more than 99,999 loc)
  TAG        = *(ALPHA / "-") ":" *VCHAR                                  ; name-value pairs
  FULL-DATE  = 4DIGIT "-" 2DIGIT "-" 2DIGIT                               ; e.g. 2019-12-31
  FULL-TIME  = 2DIGIT ":" 2DIGIT ":" 2DIGIT "." 3*6DIGIT "Z"              ; 23:42:50.523Z = 42 minutes and 50.523 seconds after the 23rd hour in UTC. Minimum subsecond precision should be 3 decimal points.
  OCTET      = %d00-255                                                   ; any byte
  DIGIT      = %d48-57                                                    ; 0 - 9

Examples:

::

  1|2019-12-31T23:42.526Z|INFO||testpackage.testmodule.TestDevice.test_fn|test.py#1|tango-device:my/dev/name| Regular information should be logged like this FYI
  1|2019-12-31T23:45.328Z|DEBUG||testpackage.testmodule.TestDevice.test_fn|test.py#150|| x = 67, y = 24
  1|2019-12-31T23:49.543Z|WARNING||testpackage.testmodule.TestDevice.test_fn|test.py#16|| z is unspecified, defaulting to 0!
  1|2019-12-31T23:50.124Z|ERROR||testpackage.testmodule.TestDevice.test_fn|test.py#165|site:Element| Could not connect to database!
  1|2019-12-31T23:51.036Z|CRITICAL||testpackage.testmodule.TestDevice.test_fn|test.py#16|| Invalid operation. Cannot continue.

Versioning
----------

The log standard is versioned so that it can be modified or extended. Theoretically anything after the first "|" delimiter can be changed as long as you specify a different version number up to 99.

For example, if it's decided that LINE-LOC is no longer needed as a first class field in the log standard, we can publish a new version omitting it.

Version 1:

::

  1|2019-12-31T23:49.543Z|WARNING||testpackage.testmodule.TestDevice.test_fn|test.py#16|| z is unspecified, defaulting to 0!

Version 2:

::

  2|2019-12-31T23:49.543Z|WARNING||test.py#16|| z is unspecified, defaulting to 0!

Parsing
-------

The format is simple enough and the only fixed points is the choice of delimiter ("|") and number of first class fields (8, as of version 1). This allows for two basic parsing strategies.

Procedural
""""""""""

Splitting by delimiter and then refering to the index is a common operation in any programming environment.

Python (str.split)

::

  log_line = "1|2019-12-31T23:50.124Z|ERROR||testpackage.testmodule.TestDevice.test_fn|test.py#165|site:Element| Could not connect to database!"
  structured_log = log_line.split('|')
  log_level = structured_log[5]

Regex
"""""

The following regular expression can match all fields between the "|" delimiters:

[^|]+(?=|[^|]*$)
A more specific regex that leverages named capture to extract matches:

::

  ^(?<version>\d+)[|](?<timestamp>[0-9TZ\-:.]+)[|](?<level>[\w\s]+)[|](?<thread>[\w-]*)[|](?<function>[\w\-.]*)[|](?<lineloc>[\w\s.#]*)[|](?<tags>[\w\:,-]*)[|](?<message>.*)$

For a demonstration see: https://rubular.com/r/e0njVOGCN59mtA

Design Motivations
==================

The design of the log format above is a work in progress and a first attempt to introduce standardised logging practices. Some preliminary investigations were made to survey the current logging practices employed in different teams/components (see a report on this, `Investigation of Logging Practices <https://confluence.skatelescope.org/pages/viewpage.action?pageId=74740601>`_).

Assumption 1:
  First-party components to be integrated on a system level will be containerised.

  **Implication**:  Containerisation best practices with regards to logging should apply. This means logging to `stdout` or console so that the routing and handling of log messages can be handled by the container runtime (`dockerd`, `containerd`) or dynamic infrastructure platform (k8s).

Assumption 2:
  A log ingestor component will be deployed as part of logging architecture.

  **Implication**:  A log ingestor is responsible for:

      - fetching log data from a source, e.g. journald, file , socket, etc.
      - processing it, e.g. parsing based on standardised format to extract key information and transform to other formats such as JSON to be sent to a log datastore.
      - shipping it to a log datastore (Elasticsearch) or another log ingestor (Logstash)

Syslog (RFC5424)
-----------------

We question the need for conforming to syslog standard in container level logs that print to `stdout`. From prior investigations, the existing log practices in the SKA codebase do not necessarily conform to syslog either, nor is there a consistent pattern. We used this opportunity to propose a log format the meets the folllowing goals:

As such we believe the most important features of a standard log message are:

1. to prescribe minimum supported bits of useful information, this includes

   a. timestamp
   b. log level
   c. extensible tags - a mechanism to specify arbitrary tags [1]
   d. fully qualified name of call context (the function in source code that log comes from) [1]
   e. filename where log call is situated [1]
   f. line number in file [1]

2. should be easy to parse

3. readability for local development

Log messages that conform to a standard can always be transformed into syslog compliant loglines before being shipped to a log aggregator.

Time stamps
-----------

Timestamps are included as part of the standard log message so that we can troubleshoot a class of issues that might occur between processes and the ingestion of logs, .e.g. reconcile order of log messages between ingestor and process.

Tags
----

To avoid upfront assumptions about what identifiers are universally required, we specify a section for adding arbitrary tags. We can standardise on some tag names later on, e.g. ``TangoDeviceName:powersupply,Tango``

Further work
============

Log Ingestor Transformations
----------------------------

Implementation details of how log transformations ought to work, will be architecture specific but we still need to understand how to achieve it in the chosen technology (whether fluentd or filebeat+logstash).

This implies deploying a log ingestor close as possible to the target container/process and have it transform log messages according to the above spec before shipping it to log storage (elasticsearch).

Field size limits
-----------------

Decide on reasonable size limits for each field, e.g. SEVERITY will always be between 4-8 characters: INFO(4), CRITICAL(8)

Should MESSAGE have a size limit? What if we want to add an arbitrary data structure inside the MESSAGE such as a JSON object? Should it support that or be disallowed upfront?

Standard Tags (LogViewer)
=========================

A list of tags (identifiers) we want to add to log messages for easy filtering and semantic clarity:

- Tag: deviceName

  - Description: Identifier that corresponds to the TANGO device name, a string in the form:  "<facility>/<family>/<device>".

    - facility : The TANGO facility encodes the telescope (LOW/MID) and its sub-system [2] (see [3]),
    - family : Family within facility (see [3]),
    - device : TANGO device name (see [3]).

  - Example: ``MID-D0125/rx/controller``, where

    - ``MID-D0125`` : Dish serial number,
    - ``rx`` : Dish Single Pixel Feed Receiver (SPFRx),
    - ``controller`` : Dish SPFRx controller.

- Tag: subSystem

  - Description: For software that are not TANGO devices, the name of the telescope sub-system [2].
  - Example: ``SDP``

[1] Optional, since it won't apply to all contexts, e.g. third-party applications.

[2] CSP, Dish, INAU, INSA, LFAA, SDP, SaDT, TM.

[3] 000‐000000‐012, SKA1 TANGO Naming Convention (CS_GUIDELINES Volume2), Rev 01
