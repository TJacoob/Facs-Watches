import { FilesCollection } from 'meteor/ostrio:files';

Template.uploadForm.onCreated(function () {
  this.currentUpload = new ReactiveVar(false);
  this.subscribe('files.images.all');
});

Template.imagesShow.onCreated(function () {
  this.subscribe('files.images.all');
});

Template.uploadForm.helpers({
  currentUpload: function () {
    return Template.instance().currentUpload.get();
  }
});

Template.imagesShow.helpers({
  	imageFile: function () {
    	return Images.findOne();
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
        } else {
          alert('File "' + fileObj.name + '" successfully uploaded');
        }
        template.currentUpload.set(false);
      });

      upload.start();
    }
  }
});