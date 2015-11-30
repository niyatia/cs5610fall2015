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
        var deferred = q.defer ();

        formModel.findById (formId, {"fields" : 1, "_id" : 0}, function (err, fields) {
            if (err)
                deferred.reject (err);
            else
                deferred.resolve (fields);
        });
        return deferred.promise;
    }

    function findFieldByFieldAndFormId (formId, fieldId) {
        var deferred = q.defer ();

        formModel.find ({$and : [{"_id" : formId}, {}]}, function (err, form) {
            if (err)
                deferred.reject (err);
            else {
                form.fields.splice (fieldId, 1);
                form.save (function (err, form) {
                    deferred.resolve(form);
                });
            }
        });
        return deferred.promise;
    }

    function deleteFieldByFieldAndFormId (formId, fieldId) {
        var deferred = q.defer ();

        formModel.findById (formId, function (err, form) {
            if (err)
                deferred.reject (err);
            else {
                console.log("Before delete");
                console.log(form);
                form.fields.splice (fieldId, 1);
                console.log("After delete");
                console.log(form);
                form.save (function (err, form) {
                    deferred.resolve(form);
                });
            }
        });
        return deferred.promise;
    }

    function createNewFieldForForm (formId, newField) {
        var deferred = q.defer ();

        formModel.findById (formId, function (err, form) {
            if (err)
                deferred.reject (err);
            else {
                form.fields.push (newField);
                form.save (function (err, form) {
                    deferred.resolve(form);
                });
            }
        });
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