import Lottie from 'lottie-react';
import loadingAnimation from '../../../public/loading.json';

const LottieAnimation = () => {
  return <Lottie animationData={loadingAnimation} loop={true} className="w-32 mx-auto" />;
};

export default LottieAnimation;
