import React from 'react'

const Contact = () => {
  return (
    <div>
    <div id="colorlib-contact">
        <div className="container">
            <div className="row">
                <div className="col-sm-12">
                    <h3>Contact Information</h3>
                    <div className="row contact-info-wrap">
                        <div className="col-md-3">
                            <p><span><i className="icon-location"></i></span> 198 West 21th Street, <br/> Suite 721 New York NY 10016</p>
                        </div>
                        <div className="col-md-3">
                            <p><span><i className="icon-phone3"></i></span> <a href="tel://1234567920">+ 1235 2355 98</a></p>
                        </div>
                        <div className="col-md-3">
                            <p><span><i className="icon-paperplane"></i></span> <a href="mailto:info@yoursite.com">info@yoursite.com</a></p>
                        </div>
                        <div className="col-md-3">
                            <p><span><i className="icon-globe"></i></span> <a href="#">yoursite.com</a></p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="contact-wrap">
                        <h3>Get In Touch</h3>
                        <form action="#" className="contact-form">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label for="fname">First Name</label>
                                        <input type="text" id="fname" className="form-control" placeholder="Your firstname"/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label for="lname">Last Name</label>
                                        <input type="text" id="lname" className="form-control" placeholder="Your lastname"/>
                                    </div>
                                </div>
                                <div className="w-100"></div>
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <label for="email">Email</label>
                                        <input type="text" id="email" className="form-control" placeholder="Your email address"/>
                                    </div>
                                </div>
                                <div className="w-100"></div>
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <label for="subject">Subject</label>
                                        <input type="text" id="subject" className="form-control" placeholder="Your subject of this message"/>
                                    </div>
                                </div>
                                <div className="w-100"></div>
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <label for="message">Message</label>
                                        <textarea name="message" id="message" cols="30" rows="10" className="form-control" placeholder="Say something about us"></textarea>
                                    </div>
                                </div>
                                <div className="w-100"></div>
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <input type="submit" value="Send Message" className="btn btn-primary"/>
                                    </div>
                                </div>
                            </div>
                        </form>		
                    </div>
                </div>
                <div className="col-md-6">
                    <div id="map" className="colorlib-map"></div>		
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Contact;