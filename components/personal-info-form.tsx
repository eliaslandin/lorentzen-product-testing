"use client";

export const PersonalInfoForm = ({
  userId,
  testId,
}: {
  userId: string;
  testId: number;
}) => {
  return (
    <div>
      User: {userId}. Test: {testId}.
    </div>
  );
};
