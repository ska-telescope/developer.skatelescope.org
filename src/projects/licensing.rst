Licensing your project
----------------------

SKA organisation promotes a model of open and transparent collaboration. In this model collaboration is made possible using permissive licenses, and not by pursuing the ownership of code by the organisation.
Copyright will thus belong to the institutions contributing to source code development for the lifetime of the project, and software developed for the SKA telescope will be available to the wider community as source code.
Redistribution of the SKA software will always maintain the original copyright information, acknowledging the original software contributor.

License File
============

Every software repository shall be licensed according to the SPDX standard.
Every repository shall contain a LICENSE file in its top directory, indicating the copyright holder and the license used for the software in its full textual representation.

Licenses
========

SKA office will automatically accept the BSD 3-clause new LICENSE and any exception to this shall be justified and agreed with SKA office Software Quality Assurance engineer. A template of the license is presented at the end of this page.
Existing repositories already published with permissive licenses such as Apache 2.0 or MIT licenses will also be accepted as part of the handover procedure, while new repositories are encouraged to adopt the recommended BSD license.

Copyright Information
=====================

Copyright information shall be included in the license file, clearly stating the year and the institution the copyright applies to, in the form:

::

    Copyright <years> <institution>

    An example of this for the SKA organisation would be:

    Copyright 2018 SKA Organisation

A non exhaustive list of possible copyright notices, based on pre construction SKA collaborators, may include one or more of the following::

    Copyright 2018 AIT Aveiro
    Copyright 2018 ASTRON
    Copyright 2018 ATC
    Copyright 2018 CSIRO
    Copyright 2018 ICRAR
    Copyright 2018 INAF
    Copyright 2018 NCRA
    Copyright 2018 SARAO
    Copyright 2018 University of Malta
    Copyright 2018 University of Manchester
    Copyright 2018 University of Oxford
    ...

A single license file can contain multiple copyright notices, indicating the major contributors to the software repositories.
It is not in the scope of the copyright notice to maintain an updated list of single contributors which can always be extracted from the DVCS server system in a more reliable and maintainable way.
Whenever a license assumes that copyright is explicitly stated as part of the header of every source code file, this can be summarized into a single centralized COPYRIGHT file in the top directory of the repository, containing all copyright attributions and referred to by the single header comments in the source code::

    Copyright 2018 The Foo Project Developers. See the COPYRIGHT file at the top-level directory of this distribution.

It will be the duty of single repository administrators to make sure that copyright notices are maintained and updated according to the institution contributing to the project.

BSD 3-Clause "New" or "Revised" License text template
=====================================================

::

    Copyright <YEAR> <COPYRIGHT HOLDER>

    Redistribution and use in source and binary forms, with or without
    modification, are permitted provided that the following conditions are met:

    1. Redistributions of source code must retain the above copyright notice,
    this list of conditions and the following disclaimer.

    2. Redistributions in binary form must reproduce the above copyright
    notice, this list of conditions and the following disclaimer in the
    documentation and/or other materials provided with the distribution.

    3. Neither the name of the copyright holder nor the names of its
    contributors may be used to endorse or promote products derived from this
    software without specific prior written permission.

    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
    AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
    IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
    ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
    LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
    CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
    SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
    INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
    CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
    ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
    POSSIBILITY OF SUCH DAMAGE.
