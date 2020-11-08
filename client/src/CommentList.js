import React from 'react';

// eslint-disable-next-line import/no-anonymous-default-export
export default ( { comments } ) => {
    const renderedComments = comments.map(comment => {
        const status = comment.status;
        let content;
        if (status === 'approved') {
            content = comment.content;
        } else if (status === 'pending') {
            content = 'This comment is awaiting moderation';
        } else if (status === 'rejected') {
            content = 'This comment has been rejected';
        } else {
            content = 'Unexpected status';
        }

        return <li key={comment.id}>{content}</li>
    });

    return <ul>{renderedComments}</ul>;
};