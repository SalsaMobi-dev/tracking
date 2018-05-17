/**
 * Copyright 2017 Intel Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ----------------------------------------------------------------------------
 */
'use strict'

const _ = require('lodash');
const fs = require('fs');
const xml2js = require('xml2js');
const parser = new xml2js.Parser();

const getStatusList = () => {
  const filename = 'CoLoadX315.xml';
  const file_path = __dirname + '/' + filename;
  return Promise.resolve()
    .then(() => {
      fs.readFile(file_path, function (err, data) {
        parser.parseString(data, function (err, result) {
          const status = getStatusByKey(result, 'NYKSCHITJ8929600', 'NYKU5698819');
          return status;
        });
      });
    });
}

const getStatusByKey = (result, mbl_no, cntr_no) => {
  var status_collection = [];
  _.forEach(result['EDI']['ID'], function (value, key) {
    if (mbl_no === value['KEY'][0]['MBL_NO'][0] && cntr_no === value['KEY'][0]['CNTR_NO'][0]) {
      status_collection = value['INFO'][0]['STATUS_HEADER'][0]['STATUS'][0]['ID'];
    }
  });

  return status_collection;
}

module.exports = {
  getStatusByKey,
  getStatusList
};
