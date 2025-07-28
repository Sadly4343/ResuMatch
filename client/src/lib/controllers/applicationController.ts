import  Application from "@/lib/models/Application";

// Get all applications for a user
export async function getUserApplications(userId: string) {
  return Application.find({ user: userId }).sort({ dateApplied: -1 });
};

// Get single application
export async function getApplication(userId: string, id: string) {
  const application = await Application.findOne({ _id: id, user: userId});
  if (!application) throw new Error("Application is not found");
  return application;
}
// Create new application
export async function createApplication(userId: string, data: any) {
     const {
      jobTitle,
      company,
      status,
      dateApplied,
      jobDescription,
      salary,
      location,
      notes,
      interviewDate,
      followUpDate
    } = data;

     const application = new Application({
      user: userId,
      jobTitle,
      company,
      status: status || "applied",
      dateApplied: dateApplied || new Date(),
      jobDescription,
      salary,
      location,
      notes,
      interviewDate,
      followUpDate
    });


  await application.save();
  return application;
  };

// Update application
export async function updateApplication(userId: string, id: string, data: any) {
  const application = await Application.findOneAndUpdate(
    { _id: id, user: userId },
    { ...data, updatedAt: Date.now() },
    { new: true, runValidators: true }
  );
  if (!application) throw new Error("Application is not found");
  return application;
}
// Delete application
export async function deleteApplication(userId: string, id: string) {
  const application = await Application.findOneAndDelete({ _id: id, user: userId });
  if (!application) throw new Error("Application is not found");
  return { message: "Application has been deleted"};
}
// Get application statistics
export async function getApplicationStats(userId: string) {
  const stats = await Application.aggregate([
    { $match: { user: userId }},
    { $group: { _id: "$status", count: { $sum: 1 }}},
  ]);
  const totalApplications = await Application.countDocuments({ user: userId });
  const recentApplications = await Application.find({ user: userId })
    .sort({ dateApplied: -1})
    .limit(5);

    return { stats, totalApplications, recentApplications};
}

