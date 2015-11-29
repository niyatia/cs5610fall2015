var forms = require('../models/form.mock.json');
var q = require("q");

module.exports = function(mongoose, db) {

    var FormSchema = require("./form.schema.js")(mongoose);
    var formModel = mongoose.model("formModel", FormSchema);

    var api = {
        //form api
        findAllForms: findAllForms,
        findFormById : findFormById,
        findAllFormsForUser : findAllFormsForUser,
        createForm : createForm,
        updateForm : updateForm,
        deleteForm : deleteForm,

        // field api
        findAllFieldsForForm : findAllFieldsForForm,
        findFieldByFieldAndFormId : findFieldByFieldAndFormId,
        deleteFieldByFieldAndFormId : deleteFieldByFieldAndFormId,
        createNewFieldForForm : createNewFieldForForm
    };
    return api;

    function findFormById(formId) {
        var deferred = q.defer();
        formModel.findById(formId, function(err, forms){
            deferred.resolve(forms);
        });
        return deferred.promise;
    }

    function findAllForms() {
        var deferred = q.defer();
        formModel.find(function(err, forms) {
            deferred.resolve(forms);
        });
        return deferred.promise;
    }

    function findAllFormsForUser(userId) {
        var deferred = q.defer();
        formModel.find({userId: userId}, function(err, forms){
            deferred.resolve(forms);
        });
        return deferred.promise;
    }

    function deleteForm(formId) {

        var deferred = q.defer();
        var userId = formModel.find( { }, { title: 0 } );
        formModel.remove({_id: formId}, function(err, forms){
            if(err) {
                console.log("Error deleting form for user!");
                deferred.reject(err);
            } else {
                formModel.find({userId: userId}, function(err, form){
                    deferred.resolve(form);
                });
            }
        });

        return deferred.promise;
    }

    function createForm(newForm) {
        var deferred = q.defer();
        console.log("inside model.createForm");
        console.log(newForm);
        var userId = newForm.userId;
        formModel.create(newForm, function(err, form){
            console.log(form);
            if(err) {
                console.log("Error adding form for user!");
                console.log(err);
                deferred.reject(err);
            } else {
                formModel.find({userId: userId}, function(err, forms){
                    deferred.resolve(forms);
                });
            }
        });
        return deferred.promise;
    }

    function updateForm(formId, updatedForm) {
        var deferred = q.defer();
        var userId = formModel.find( { }, { title: 0 } );
        formModel.update({_id: formId}, {$set: updatedForm}, function(err, forms) {
            if(err) {
                console.log("Cud not find Usr!!");
                deferred.reject(err);
            } else {
                console.log("Update successful!");
                formModel.find({userId: userId}, function(err, form){
                    deferred.resolve(form);
                });
            }
        });
        return deferred.promise;
    }

    function findAllFieldsForForm (formId) {
        var deferred = q.defer();

        var fieldsToReturn = [];
        for (var i = 0; i < forms.length; i++) {
            if (forms[i].id == formId) {
                fieldsToReturn = forms[i].fields;
                break;
            }
        }

        deferred.resolve(fieldsToReturn);
        return deferred.promise;
    }

    function findFieldByFieldAndFormId (formId, fieldId) {
        for (var i = 0; i < forms.length; i++) {
            if (forms[i].id == formId) {
                var fields = forms[i].fields;
                for (var j = 0; j < fields.length; j++) {
                    if (fields[j].id == fieldId)
                        return fields[j];
                }
            }
        }
        return null;
    }

    function deleteFieldByFieldAndFormId (formId, fieldId) {

        var deferred = q.defer();
        for (var i = 0; i < forms.length; i++) {
            if (forms[i].id == formId) {
                var fields = forms[i].fields;
                for (var j = 0; j < fields.length; j++) {
                    if (fields[j].id == fieldId) {
                        forms[i].fields.splice(j, 1);
                        break;
                    }
                }
            }
        }
        deferred.resolve(forms);
        return deferred.promise;
    }

    function createNewFieldForForm (formId, newField) {
        var deferred = q.defer();
        newField.id = guid();
        for (var i = 0; i < forms.length; i++) {
            if (forms[i].id == formId) {
                forms[i].fields.push(newField);
                break;
            }
        }
        deferred.resolve(forms);
        return deferred.promise;
    }

    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }
};