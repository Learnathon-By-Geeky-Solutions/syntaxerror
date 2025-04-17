import FeaturesBanner from "./FeaturesBanner";

const WhyChooseUs = () => {
  return (
    <div className="container mx-auto px-4 md:px-8 pt-12 mb-12">
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Why Choose iKrishak</h2>
        <p className="text-gray-600 text-xs md:text-sm font-light max-w-sm md:max-w-2xl mx-auto">
          We&apos;re committed to providing the freshest produce and the best shopping experience
        </p>
      </div>

      <FeaturesBanner></FeaturesBanner>
    </div>
  );
};

export default WhyChooseUs;