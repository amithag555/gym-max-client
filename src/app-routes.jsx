import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "./admin-layout/admin-layout";
import AdminLogin from "./admin-login/admin-login";
import CreatePlanItemExercise from "./create-plan-item-exercise-member/create-plan-item-exercise";
import CreatePlanItem from "./create-plan-item-member/create-plan-item";
import CreateTrainingPlan from "./create-training-plan-member/create-training-plan";
import DisplayAllMemberTrainingPlans from "./display-all-member-training-plans/display-all-member-training-plans";
import DisplayAllMembers from "./display-all-members/display-all-members";
import DisplayAllTrainingPlansAdmin from "./display-all-training-plans-admin/display-all-training-plans-admin";
import DisplayAllUsers from "./display-all-users/display-all-users";
import DisplayClassesScheduleAdmin from "./display-classes-schedule-admin/display-classes-schedule-admin";
import DisplayClassesScheduleMember from "./display-classes-schedule-member/display-classes-schedule-member";
import DisplayLoadStatisticsGraphAdmin from "./display-load-statistics-graph-admin/display-load-statistics-graph-admin";
import DisplayLoadStatisticsGraphMember from "./display-load-statistics-graph-member/display-load-statistics-graph-member";
import DisplayTrainingPlan from "./display-training-plan-member/display-training-plan";
import DisplayWorkoutGoalStatistics from "./display-workout-goal-statistics/display-workout-goal-statistics";
import Error403 from "./helpers/error-403";
import Error404 from "./helpers/error-404";
import HomePageAdmin from "./home-page-admin/home-page-admin";
import HomePageMember from "./home-page-member/home-page-member";
import MemberCard from "./member-card/member-card";
import MemberLayout from "./member-layout/member-layout";
import MemberLogin from "./member-login/member-login";
import MemberProfile from "./member-profile/member-profile";
import MemberSettings from "./member-settings/member-settings";
import UpdatePasswordFormMember from "./update-password-form-member/update-password-form-member";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/login" element={<MemberLogin />} />

        <Route path="/" element={<MemberLayout />}>
          <Route index element={<HomePageMember />} />
          <Route path="/trainingPlan/:id" element={<DisplayTrainingPlan />} />
          <Route path="/createTrainingPlan" element={<CreateTrainingPlan />} />
          <Route path="/createPlanItem" element={<CreatePlanItem />} />
          <Route path="/createExercise" element={<CreatePlanItemExercise />} />
          <Route path="/myTrainingPlans" element={<DisplayAllMemberTrainingPlans />} />
          <Route path="/classesSchedule" element={<DisplayClassesScheduleMember />} />
          <Route path="/loadStatistics" element={<DisplayLoadStatisticsGraphMember />} />
          <Route path="/workoutGoalStatistics" element={<DisplayWorkoutGoalStatistics />} />
          <Route path="/profile" element={<MemberProfile />} />
          <Route path="/settings" element={<MemberSettings />} />
          <Route path="/updatePassword" element={<UpdatePasswordFormMember />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<HomePageAdmin />} />
          <Route path="/admin/trainingPlans" element={<DisplayAllTrainingPlansAdmin />} />
          <Route path="/admin/trainingPlan/:id" element={<DisplayTrainingPlan />} />
          <Route path="/admin/createTrainingPlan" element={<CreateTrainingPlan />} />
          <Route path="/admin/createPlanItem" element={<CreatePlanItem />} />
          <Route path="/admin/createExercise" element={<CreatePlanItemExercise />} />
          <Route path="/admin/classesSchedule" element={<DisplayClassesScheduleAdmin />} />
          <Route path="/admin/loadStatistics" element={<DisplayLoadStatisticsGraphAdmin />} />
          <Route path="/admin/members" element={<DisplayAllMembers />} />
          <Route path="/admin/users" element={<DisplayAllUsers />} />
          <Route path="/admin/memberCard" element={<MemberCard />} />
        </Route>

        <Route path="/pageError403" element={<Error403 />} />
        <Route path="/*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}
