import React from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

const VideoPlayer = ({ playlistId, onClose }) => {
  return (
    <Modal
      open={playlistId !== null}
      onClose={onClose}
      center
      classNames={{
        modal: 'customModal',
        overlay: 'customOverlay',
      }}
      styles={{
        modal: {
          background: "#fff",
          maxWidth: '900px',
          width: '90%',
          padding: '0',
        },
        overlay: {
          background: "rgba(0, 0, 0, 0.75)",
        },
      }}
    >
      <div className="ratio ratio-16x9">
        <iframe
          src={`https://www.youtube.com/embed/videoseries?list=${playlistId}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </Modal>
  );
};

export default VideoPlayer; 