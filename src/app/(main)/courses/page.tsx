import { getCourses, getUserProgress } from "@/server/db/queries";
import List from "./list";

/**
 *
 * @link https://www.figma.com/design/o7kLTNBD54bhmvPScLiDAL/Lexia-%7C-Language-Learning?node-id=1-3433&m=dev
 */
async function CoursesPage() {
  const coursesData = getCourses();
  const userProgressData = getUserProgress();

  const [courses, userProgress] = await Promise.all([
    coursesData,
    userProgressData,
  ]);

  return (
    <div className="mx-auto h-full max-w-[912px] px-6 py-8 pb-[50px]">
      <h1 className="text-2xl font-bold text-neutral-700">Language Courses</h1>
      <List courses={courses} activeCourseId={userProgress?.activeCourseId} />
    </div>
  );
}

export default CoursesPage;
