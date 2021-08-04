/*
    *refer modules
 */
const jsonFormat=require('../middleware/jsonFormat');
const errorHandler=require('./errorHandler');
const cors=require('./cors');

module.exports={
    jsonFormat:jsonFormat,
    errorHandler:errorHandler,
    cors:cors
}