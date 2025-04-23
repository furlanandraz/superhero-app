import { useState } from 'react';
import styles from './Image.module.css'; // you'll create this CSS module

export default function Image({ url, alt }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  function imageLoaded() {
    setLoading(false);
  }

  function imageHasError() {
    setError('Failed to load image');
    setLoading(false);
  }

  return (
    <div className={styles.imageWrapper}>
      {error && <p className={styles.error}>{error}</p>}

          {!error && <img
              src={`${url}`}
              alt={alt}
              onLoad={imageLoaded}
              onError={imageHasError}
              className={styles.image}
          />}

      {loading && <div className={styles.loadingOverlay}></div>}
    </div>
  );
}
