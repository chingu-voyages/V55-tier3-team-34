
export const navigationPaths = {
    projectsPage() { return   "/"},
    profilesPage(){ return  "/profiles" },
    profile(userId: string) {
        return `/profiles/${userId}`
    },
    projectDetail(projectId: number) {
        return `/projects/${projectId}`
    },
    createProject() { return "/projects/create"},
    githubLogin() {
        return `${process.env.NEXT_PUBLIC_API_URL}/auth/github`;
    }
}
