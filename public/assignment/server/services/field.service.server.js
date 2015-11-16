var model = require("../models/form.model.js")();

module.exports = function(app) {
    app.get("/api/assignment/form/:formId/field", findAllFieldsForForm);
    app.post("/api/assignment/form/:formId/field", createNewFieldForForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldForForm);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldByFormIdAndFieldId);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldByFormIdAndFieldId);

    function createNewFieldForForm(req, res) {

        var formId = req.params.formId;
        var fieldObj = req.body;
        model
            .createNewFieldForForm(formId, fieldObj)
            .then(function(form){
                res.json(form);
            });
    }

    function findAllFieldsForForm(req, res){

        var formId = req.params.formId;
        console.log(formId);
        model
            .findAllFieldsForForm(formId)
            .then(function(fields){
                console.log("inside then");
                res.json(fields);
            });
    }

    function findFieldByFormIdAndFieldId(req, res){

        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        model
            .findFieldByFormAndFieldId(fieldId, formId)
            .then(function(field){
                res.json(field);
            });
    }

    function updateFieldForForm(req, res) {

        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var fieldObj = req.body;
        model
            .updateFieldForForm(fieldId, formId, fieldObj)
            .then(function(form){
                res.json(form);
            });
    }

    function deleteFieldByFormIdAndFieldId(req, res) {

        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        model
            .deleteFieldByFieldAndFormId(formId, fieldId)
            .then(function(form){
                res.json(form);
            });
    }

};