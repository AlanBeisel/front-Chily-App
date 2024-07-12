"use client"
import React, { useState, useEffect } from 'react';
import styles from './StatusTracker.module.css';
import { FcInTransit } from 'react-icons/fc';

interface StatusTrackerProps {
  status: string;
}

const StatusTracker: React.FC<StatusTrackerProps> = ({ status }) => {
  const [currentStatus, setCurrentStatus] = useState(status);

  const statuses = [
    'Pendiente',
    'Confirmada',
    'En preparación',
    'En camino',
    'Entregada',
  ];
  const currentIndex = statuses.indexOf(currentStatus);

  useEffect(() => {
    const index = statuses.indexOf(status);
    if (index !== -1) {
      setCurrentStatus(status);
    }
  }, [status]);

  return (
    <div className="bg-white border rounded-xl mb-4">
      <p className="text-xl font-bold m-4">Estado de tu orden:</p>
      <div className={styles.container}>
        <div
          className={styles.icon}
          style={{ left: `${(currentIndex / (statuses.length - 1)) * 100}%` }}
        >
          <FcInTransit size={28} />
        </div>
        <div className={styles.progressContainer}>
          <div className={styles.line}>
            <div
              className={styles.progress}
              style={{
                width: `${(currentIndex / (statuses.length - 1)) * 100}%`,
              }}
            />
          </div>
        </div>
        <div className={styles.statuses}>
          {statuses.map((status, index) => (
            <div
              key={status}
              className={`${styles.status} ${index <= currentIndex ? styles.active : ''}`}
            >
              {status}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatusTracker;
