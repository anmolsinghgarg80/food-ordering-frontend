import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";
import { Skeleton } from "@/components/ui/skeleton";

function UserProfilePage() {
  const { currentUser, isLoading: isGetLoading } = useGetMyUser();
  const { updateUser, isLoading: isUpdateLoading } = useUpdateMyUser();

  if (isGetLoading) {
    return (
      <div className="bg-white rounded-lg p-6 max-w mx-auto">
        <Skeleton className="h-10 w-1/2 mb-6" />

        <div className="space-y-6">
          {/* User Details Section */}
          <div className="space-y-4">
            <div>
              <Skeleton className="h-5 w-24 mb-2" />
              <Skeleton className="h-9 w-full" />
            </div>

            <div>
              <Skeleton className="h-5 w-32 mb-2" />
              <Skeleton className="h-9 w-full" />
            </div>

            <div>
              <Skeleton className="h-5 w-40 mb-2" />
              <Skeleton className="h-9 w-full" />
            </div>
          </div>

          {/* Address Section */}
          <div>
            <Skeleton className="h-7 w-48 mb-4" />

            <div className="space-y-4">
              <div>
                <Skeleton className="h-5 w-36 mb-2" />
                <Skeleton className="h-9 w-full" />
              </div>

              <div>
                <Skeleton className="h-5 w-32 mb-2" />
                <Skeleton className="h-9 w-full" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Skeleton className="h-5 w-20 mb-2" />
                  <Skeleton className="h-9 w-full" />
                </div>
                <div>
                  <Skeleton className="h-5 w-24 mb-2" />
                  <Skeleton className="h-9 w-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Skeleton className="h-9 w-full max-w-xs" />
          </div>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <span>Unable to load user profile</span>;
  }

  return (
    <UserProfileForm
      currentUser={currentUser}
      onSave={updateUser}
      isLoading={isUpdateLoading}
    />
  );
}

export default UserProfilePage;
