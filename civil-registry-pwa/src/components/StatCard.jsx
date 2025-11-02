import React from "react";

const StatCard = ({ label, value, icon }) => {
  return (
    <div className="card border border-base-300 bg-base-100">
      <div className="card-body p-4">
        <div className="flex items-center gap-3">
          <div className="text-primary text-xl">{icon}</div>
          <div>
            <p className="text-sm text-base-content/70">{label}</p>
            <p className="text-xl font-semibold leading-6">{value}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;


