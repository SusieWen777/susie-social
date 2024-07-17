import { FaRegThumbsUp } from "react-icons/fa";

interface LikeButtonProps {
  likes: number;
  size: number;
  className?: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ likes, className, size }) => {
  return (
    <div className={`${className} cursor-pointer`}>
      <FaRegThumbsUp size={size} color="#0F67B1" />
      <span className="text-gray-300">|</span>
      <span className="text-gray-500">
        {likes}
        <span className="hidden md:inline"> Likes</span>
      </span>
    </div>
  );
};

export default LikeButton;
