import React from "react";

const CommentModal = ({ open, onClose }) => {

    if (!open) return null;

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(0,0,0,0.7)",
                zIndex: 999999,
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <div
                style={{
                    width: "350px",
                    background: "white",
                    padding: "20px",
                    borderRadius: "10px"
                }}
            >
                <h2>Comment Modal</h2>

                <button onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default CommentModal;