document.addEventListener('DOMContentLoaded', () => {
  const imageUpload = document.getElementById('image-upload');
  const previewImage = document.getElementById('preview-image');
  const qualitySlider = document.getElementById('quality-slider');
  const qualityValue = document.getElementById('quality-value');
  const compressBtn = document.getElementById('compress-btn');
  const downloadLink = document.getElementById('download-link');
  const previewSection = document.querySelector('.preview-section');
  const controls = document.querySelector('.controls');
  const downloadSection = document.querySelector('.download-section');

  let uploadedImage = null;

  // Handle image upload
  imageUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        uploadedImage = e.target.result;
        previewImage.src = uploadedImage;
        previewSection.classList.remove('hidden');
        controls.classList.remove('hidden');
        downloadSection.classList.add('hidden');
      };
      reader.readAsDataURL(file);
    }
  });

  // Update quality value display
  qualitySlider.addEventListener('input', () => {
    qualityValue.textContent = qualitySlider.value;
  });

  // Compress image
  compressBtn.addEventListener('click', () => {
    if (!uploadedImage) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Convert to JPEG with specified quality
      const quality = qualitySlider.value / 100;
      canvas.toBlob(
        (blob) => {
          const compressedUrl = URL.createObjectURL(blob);
          downloadLink.href = compressedUrl;
          downloadSection.classList.remove('hidden');
        },
        'image/jpeg',
        quality
      );
    };

    img.src = uploadedImage;
  });
});