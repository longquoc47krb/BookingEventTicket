import Skeleton from "react-loading-skeleton";

function EventHomeSkeletonItem() {
  return (
    <div className="event-home-item-container cursor-test float cursor-pointera">
      <Skeleton style={{ height: 130, width: "100%" }} />
      <Skeleton count={3} />
    </div>
  );
}
export default EventHomeSkeletonItem;
