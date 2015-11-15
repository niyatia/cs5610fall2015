var model = require("../models/form.model.js")();

module.exports = function(app) {
    app.get("/api/assignment/user/:userId/form", findAllFormsForUser);
    app.get("/api/assignment/form", findAllForms);
    app.get("/api/assignment/form/:formId", findFormById);
    app.post("/api/assignment/user/:userId/form", createForm);
    app.put("/api/assignment/form/:formId", updateForm);
    app.delete("/api/assignment/form/:formId", deleteForm);

    function createForm(req, res) {

        var form = req.body;
        model
            .createForm(form)
            .then(function(forms){
                res.json(forms);
            });
    }

    function findAllFormsForUser(req, res){
        console.log(req.params.userId);
        var userId = req.params.userId;
        model
            .findAllFormsForUser(userId)
            .then(function(forms){
                console.log(forms);
                res.json(forms);
            });
    }

    function findFormById(req, res){

        var userId = req.params.userId;
        model
            .findFormById(userId)
            .then(function(form){
                res.json(form);
            });
    }

    function findAllForms(req, res){

        model
            .findAllForms()
            .then(function(forms){
                res.json(forms);
            });
    }

    function updateForm(req, res) {

        var formId = req.params.formId;
        var formObj = req.body;
        model
            .updateForm(formId, formObj)
            .then(function(form){
                res.json(form);
            });
    }

    function deleteForm(req, res) {

        var formId = req.params.formId;
        model
            .deleteForm(formId)
            .then(function(forms){
                res.json(forms);
            });
    }

};