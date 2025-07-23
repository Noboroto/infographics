// Auto Image Base64 Converter for Export PNG functionality
// This script automatically converts local images to base64 when in export mode

class ImageConverter {
	constructor() {
		this.imageCache = new Map();
		this.isConverting = false;
	}

	// Convert a single image URL to base64
	async convertImageToBase64(imageSrc) {
		if (this.imageCache.has(imageSrc)) {
			return this.imageCache.get(imageSrc);
		}

		return new Promise((resolve) => {
			const img = new Image();
			img.crossOrigin = 'anonymous';

			img.onload = () => {
				try {
					const canvas = document.createElement('canvas');
					const ctx = canvas.getContext('2d');
					canvas.width = img.naturalWidth;
					canvas.height = img.naturalHeight;

					ctx.drawImage(img, 0, 0);
					const base64 = canvas.toDataURL('image/jpeg', 0.9);

					this.imageCache.set(imageSrc, base64);
					resolve(base64);
				} catch (error) {
					console.warn('Failed to convert image:', imageSrc, error);
					resolve(imageSrc); // Return original if conversion fails
				}
			};

			img.onerror = () => {
				console.warn('Failed to load image:', imageSrc);
				resolve(imageSrc); // Return original if loading fails
			};

			// Try to load the image with different base paths
			if (imageSrc.startsWith('../imgs/')) {
				// Try different paths for the image
				const imageName = imageSrc.replace('../imgs/', '');
				const possiblePaths = [
					`../imgs/${imageName}`,
					`imgs/${imageName}`,
					`./imgs/${imageName}`
				];

				this.tryLoadImagePaths(img, possiblePaths, resolve);
			} else {
				img.src = imageSrc;
			}
		});
	}

	tryLoadImagePaths(img, paths, resolve) {
		let currentIndex = 0;

		const tryNext = () => {
			if (currentIndex >= paths.length) {
				resolve(paths[0]); // Return original if all fail
				return;
			}

			img.onerror = () => {
				currentIndex++;
				tryNext();
			};

			img.src = paths[currentIndex];
		};

		tryNext();
	}

	// Convert all images in the document to base64
	async convertAllImages() {
		if (this.isConverting) return;
		this.isConverting = true;

		console.log('🔄 Converting images to base64 for export...');

		const images = document.querySelectorAll('img[src*="../imgs/"], img[src*="imgs/"]');
		const conversions = [];

		for (const img of images) {
			const originalSrc = img.src;
			const conversion = this.convertImageToBase64(originalSrc).then(base64 => {
				if (base64 !== originalSrc && base64.startsWith('data:')) {
					img.setAttribute('data-original-src', originalSrc);
					img.src = base64;
					console.log('✅ Converted:', originalSrc.split('/').pop());
				}
				return base64;
			});
			conversions.push(conversion);
		}

		await Promise.all(conversions);
		this.isConverting = false;
		console.log('✅ All images converted to base64');
	}

	// Restore original image sources
	restoreOriginalImages() {
		console.log('🔄 Restoring original image sources...');

		const images = document.querySelectorAll('img[data-original-src]');
		for (const img of images) {
			const originalSrc = img.getAttribute('data-original-src');
			img.src = originalSrc;
			img.removeAttribute('data-original-src');
		}

		console.log('✅ Original image sources restored');
	}

	// Prepare document for export
	async prepareForExport() {
		// Add export mode class
		document.body.classList.add('export-mode');

		// Convert images to base64
		await this.convertAllImages();

		// Force Lucide icons to be visible
		this.ensureLucideIcons();

		// Wait a bit for everything to settle
		await new Promise(resolve => setTimeout(resolve, 500));

		console.log('✅ Document prepared for export');
	}

	// Restore document after export
	restoreAfterExport() {
		// Remove export mode class
		document.body.classList.remove('export-mode');

		// Restore original images
		this.restoreOriginalImages();

		console.log('✅ Document restored after export');
	}

	// Ensure Lucide icons are properly rendered
	ensureLucideIcons() {
		if (typeof lucide !== 'undefined' && lucide.createIcons) {
			lucide.createIcons();
		}

		// Force visibility for all Lucide icons
		const lucideIcons = document.querySelectorAll('[data-lucide]');
		lucideIcons.forEach(icon => {
			icon.style.display = 'inline-block';
			icon.style.visibility = 'visible';
			icon.style.opacity = '1';
		});
	}
}

// Global instance
window.imageConverter = new ImageConverter();

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', () => {
		console.log('📱 Image Converter initialized');
	});
} else {
	console.log('📱 Image Converter initialized');
}
