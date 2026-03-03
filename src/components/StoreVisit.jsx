import React from "react";
import { MapPin, Phone, Clock, Navigation } from "lucide-react";

const StoreVisit = () => {
  const handleGetDirections = () => {
    window.open(
      "https://www.google.com/maps/search/?api=1&query=MP+Arcade+near+Green+Garden+North+Karassery+Mukkam+Tazhakkod+Kerala+673602",
      "_blank",
    );
  };

  const handleCall = () => {
    window.location.href = "tel:09020300400";
  };

  const handleWhatsApp = () => {
    window.open("https://wa.me/9020300400", "_blank");
  };

  return (
    <section id="location" className="store-visit-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title-center">
            Visit Our <span className="text-accent">Store</span>
          </h2>
          <p className="section-subtitle-center">
            Come experience our complete collection in person
          </p>
        </div>

        <div className="store-grid">
          <div className="store-info">
            <div className="store-detail">
              <MapPin size={28} className="detail-icon" />
              <div>
                <h4 className="detail-title">Address</h4>
                <p className="detail-text">
                  MP Arcade, near Green Garden North,
                  <br />
                  Karassery, Mukkam, Tazhakkod,
                  <br />
                  Kerala 673602
                </p>
              </div>
            </div>

            <div className="store-detail">
              <Phone size={28} className="detail-icon" />
              <div>
                <h4 className="detail-title">Phone</h4>
                <p className="detail-text">090203 00400</p>
              </div>
            </div>

            <div className="store-detail">
              <Clock size={28} className="detail-icon" />
              <div>
                <h4 className="detail-title">Business Hours</h4>
                <p className="detail-text">
                  Open Daily
                  <br />
                  Closes at 9:00 PM
                </p>
              </div>
            </div>

            <div className="store-actions">
              <button onClick={handleCall} className="btn-secondary btn-medium">
                <Phone size={18} />
                Call Now
              </button>
              <button
                onClick={handleWhatsApp}
                className="btn-primary btn-medium"
              >
                WhatsApp Us
              </button>
              <button
                onClick={handleGetDirections}
                className="btn-ghost btn-medium"
              >
                <Navigation size={18} />
                Get Directions
              </button>
            </div>
          </div>

          <div className="store-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3912.3002837899276!2d75.99619837491588!3d11.312748388870567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba64160402baaed%3A0x6bc0e62a2078b358!2sCENTRO%20BICYCLES%20%26TOYS!5e0!3m2!1sen!2sin!4v1772542268123!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: "16px" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Centro Bicycles & Toys Location"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoreVisit;
