
export const navigationPaths = {
    projectsPage() { return   "/"},
    profilesPage(){ return  "/profiles" },
    profile(userId: string) {
        return `/profiles/${userId}`
    }
}
