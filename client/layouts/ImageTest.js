import { FilesCollection } from 'meteor/ostrio:files';

Template.uploadForm.onCreated(function () {
  this.currentUpload = new ReactiveVar(false);
  this.hasUploaded = new ReactiveVar(false);
  this.justUploaded = new ReactiveVar(false);
  this.subscribe('files.images.all');
  this.subscribe('products');
});

Template.uploadedFiles.onCreated(function () {
  this.subscribe('files.images.all');

});

Template.uploadedFiles.helpers({
  uploadedFiles: function () {
    return Images.find();
  }
});

Template.uploadForm.helpers({
  currentUpload: function () {
    return Template.instance().currentUpload.get();
  },
  hasUploaded: function(){
    return Template.instance().hasUploaded.get();
  },
  justUploaded: function(){
    var img = Template.instance().justUploaded.get() ;
    return Images.findOne({_id: img});
  }
});

Template.uploadForm.events({
  'change #fileInput': function (e, template) {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      // We upload only one file, in case 
      // there was multiple files selected
      var file = e.currentTarget.files[0];
      if (file) {
        var uploadInstance = Images.insert({
          file: file,
          streams: 'dynamic',
          chunkSize: 'dynamic'
        }, false);

        uploadInstance.on('start', function() {
          console.log(this);
          template.currentUpload.set(this);
        });

        uploadInstance.on('end', function(error, fileObj) {
          if (error) {
            alert('Error during upload: ' + error.reason);
          } else {
            alert('File "' + fileObj.name + '" successfully uploaded');
            var element = document.getElementsByName("picture");
            element[0].value = fileObj._id ;
            template.justUploaded.set(fileObj._id);
          }
          template.currentUpload.set(false);
          template.hasUploaded.set(true);
        });

        uploadInstance.start();     // Actually uploads stuff
      }
    }
  }
});