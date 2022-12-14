interface GalleryImage{
  url: string;
  title: string;
}

export default function ProductGalleryImage({ url, title }: GalleryImage) {
  return (
    <img className="gallery-product__img" src={url} alt={title} />
  );
}
