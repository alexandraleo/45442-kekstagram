'use strict';
(function () {
  var FILE_TYPES = ['jpg', 'jpeg', 'png', 'gif'];
  var fileUploader = document.querySelector('.upload-form input[type=file]');
  var photoPreview = document.querySelector('.effect-image-preview');

  fileUploader.addEventListener('change', function () {
    var file = fileUploader.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        photoPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
})();
