import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function RichTextEditor({courseData,setCourseData}) {
    const handleInputChange = (content) => {
        setCourseData({ ...courseData, description: content });
    };

    return (
        <ReactQuill 
            theme="snow" 
            value={courseData.description} 
            onChange={handleInputChange} 
        />
    );
}
