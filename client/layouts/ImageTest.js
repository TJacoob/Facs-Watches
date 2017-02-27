import { FilesCollection } from 'meteor/ostrio:files';

Template.uploadForm.onRendered(function () {
  this.currentUpload = new ReactiveVar(false);
  this.hasUploaded = new ReactiveVar(false);
  this.justUploaded = new ReactiveVar(false);
  this.subscribe('files.images.all');
  this.subscribe('products');
});

Template.uploadForm.onCreated(function () {
  this.currentUpload = new ReactiveVar(false);
});

Template.uploadForm.helpers({
  currentUpload: function () {
    return Template.instance().currentUpload.get();
  },
  justUploaded: function () {
    return Template.instance().justUploaded.get();
  }
});

Template.uploadForm.events({
  'change #fileInput': function (e, template) {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      // We upload only one file, in case
      // multiple files were selected
      var upload = Images.insert({
        file: e.currentTarget.files[0],
        streams: 'dynamic',
        chunkSize: 'dynamic'
      }, false);

      upload.on('start', function () {
        template.currentUpload.set(this);
      });

      upload.on('end', function (error, fileObj) {
        if (error) {
          alert('Error during upload: ' + error);
          template.currentUpload.set(false);
        } else {
          alert('File "' + fileObj.name + '" successfully uploaded');
        }
        template.justUploaded.set(true);
        console.log(this);
        console.log(fileObj);
        //document.getElementsByName("pictures.0.picture").value = fileObj ;
        //document.getElementById("fileInput").value = fileObj ;

        console.log(document.getElementsByName("pictures.0.picture"));
      });

      upload.start();
    }
  }
});

