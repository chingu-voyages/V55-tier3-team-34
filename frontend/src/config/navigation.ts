
export const navigationPaths = {
    projectsPage() { return   "/"},
    profilesPage(){ return  "profiles" },
    me(userId: string) {
        return `profiles/${userId}`
    }
}
