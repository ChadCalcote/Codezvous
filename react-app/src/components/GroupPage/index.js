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
                <div className="group-header_start-date"><h4>{formatDate(group.createdAt, 'long')}</h4></div>
                <div className="group-header_location">
                    Group Header Location
                </div>
                <div className="group-header_members">
                    Group header members
                </div>
                <div className="group-header_leader">
                    Group Header leader
                </div>
                <div className="group-header_status-button">
                    Button saying You're a member or Join?
                </div>
            </div>
            <div className="group-body">
                <div className="group-body_feed">
                    <div id="group-body_feed_description">
                        Description
                    </div>
                    <div id="group-body_feed_events">
                        upcoming events
                        {/* event cards */}
                        past events
                        {/* event cards */}
                    </div>
                    <div className="group-body_images">
                        Images from the events???
                    </div>
                    <div id="group-body_feed_discussion">
                        Discussion
                    </div> 
                    {/* maybe not as no seed or maybe need a new table?? */}
                </div>
                <div className="group-body_sidebar">
                    <div id="group-body_sidebar_organizer">
                        Organizer
                    </div>
                    <div id="group-body_sidebar_members">
                        Member icons
                    </div>
                    {/* members (###) */}
                    {/* member icons only */}
                </div>
                <div className="group-body_sim-events">
                    Similar events
                    {/* header tag */}
                    {/* Event Components */}
                </div>
            </div>
            <div className="group-footer">
                Footer?
                {/* Event Details  */}
                {/* RSVP COMPONENT  */}
            </div>
        </div>
    )
}

export default GroupPage;