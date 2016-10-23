import React from 'react';

export default function NotFound() {
  const styles = require('./NotFound.scss');
  return (
    <div className="container">
      <div className={styles.middleBox + ' text-center'}>
        <h1>404</h1>
        <h3 className={styles.fontBold}>Page Not Found</h3>

        <div>
            <p>Sorry, but the page you are looking for has note been found. Try checking the URL for error, then hit the refresh button on your browser or try found something else in our app.</p>
        </div>
      </div>
    </div>
  );
}
