import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import leaderboardActions from "../actions/leaderboardActions";

const Leaderboard = () => {
  const leaderboard = useSelector((state) => state.getLeaderboard.leaderboard);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(leaderboardActions.getLeaderboard());
  }, []);

  return (
    <div class="bg-white">
      <div class="overflow-x-auto border-x border-t">
        <table class="table-auto w-full">
          <thead class="border-b">
            <tr class="bg-gray-100">
              <th class="text-left p-4 font-medium">Name</th>
              <th class="text-left p-4 font-medium">Email</th>
              <th class="text-left p-4 font-medium">Yoga Days Streak</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((user) => {
              return (
                <tr class="border-b hover:bg-gray-50">
                  <td class="p-4">{user.name}</td>
                  <td class="p-4">{user.email}</td>
                  <td class="p-4">{user.days}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
