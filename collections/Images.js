import { FilesCollection } from 'meteor/ostrio:files';

Images = new FilesCollection({
  storagePath: '.meteor/local/build/programs/server',
  downloadRoute: '/files/images',
  collectionName: 'Images',
  chunkSize: 1024*2048,
  throttle: 1024*512,
  permissions: 0755,
  allowClientCode: false,
  cacheControl: 'public, max-age=31536000',
  onbeforeunloadMessage: function () {
    return 'Upload is still in progress! Upload will be aborted if you leave this page!';
  },
  onBeforeUpload: function (file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.ext)) {
      return true;
    } else {
      return 'Please upload image, with size equal or less than 10MB';
    }
  },
  downloadCallback: function (fileObj) {
    if (this.params.query.download == 'true') {
      // Increment downloads counter
      Images.update(fileObj._id, {$inc: {'meta.downloads': 1}});
    }
    // Must return true to continue download
    return true;
  }/*,
  protected: function (fileObj) {
    // Check if user is own this file
    if (fileObj.meta.owner === this.userId) {
      return true;
    } else {
      return false;
    }
  }*/
});