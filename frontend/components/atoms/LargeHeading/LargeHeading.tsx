import React from 'react';
import { Typography } from '@mui/material';
import styles from './LargeHeading.module.css';

type LargeHeadingProps = {
  text: string;
};

const LargeHeading: React.FC<LargeHeadingProps> = ({ text }) => {
  return (
    <Typography variant="h1" className={styles.mainTitle}>
      {text}
    </Typography>
  );
};

export default LargeHeading;
