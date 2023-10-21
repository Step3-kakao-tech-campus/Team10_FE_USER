const Image = ({ className, src, alt }) => {
  return (
    <picture className={className}>
      <source srcSet={src} />
      <img className={className} src={src} alt={alt} />
    </picture>
  );
};

export default Image;
