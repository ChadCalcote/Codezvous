import { useParams } from 'react-router-dom';
import React from 'react';
import { useState } from 'react';
import { formatTime, formatDate } from '../../dateFunctions';
import "./GroupPage.css"
// List Out Data from Single Event
// List Out Data about Attendees
// List Out Data about Comments
const group = {
    id: 1,
    group_name: "The Awesome Group",
    description: "This group is the most awesome group of coders in the entire world. our group is so great. We code. We do stuff together. We code together. We are awesome coding together.",
    city: "Denver",
    state: "CO",
    zip_code: "80205",
    image_url: "https://assets.fortnitecreativehq.com/wp-content/uploads/2019/02/04052712/Movie-theatre.jpg",
    leader_id: "1",
    createdAt: "2020-10-18T20:26:34.256Z",
    updatedAt: "2020-10-18T20:26:34.256Z",
};

const GroupPage = () => {

    return (
        <div className="group-page">
            <h1>Group Page!</h1>
            <div className="group-header">
                <div className="group-header_img">
                    <img href={group.image_url} />
                </div>
                <div className="group-header_date"></div>
                <div className="group-header_date"><h4>{formatDate(group.createdAt, 'long')}</h4></div>
                <div className="group-header_title"></div>
                <div className="group-header_leader"></div>
            </div>
            <div className="group-body">
                <div className="group-body_feed">
                    <div id="group-body_feed_details"></div>
                    <div id="group-body_feed_attendees"></div>
                    <div id="group-body_feed_comments"></div>
                </div>
                <div className="group-body_sidebar">
                    <div id="group-body_sidebar_group"></div>
                    <div id="group-body_sidebar_details"></div>
                </div>
                <div className="group-body_sim-events">
                    {/* header tag */}
                    {/* Event Components */}
                </div>
            </div>
            <div className="group-footer">
                {/* Event Details  */}
                {/* RSVP COMPONENT  */}
            </div>
        </div>
    )
}

export default GroupPage;