CREATE TABLE "federated_credentials" (
	"federated_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "federated_credentials_federated_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"federated_user_id" integer,
	"provider" varchar(50) NOT NULL,
	"provider_user_id" varchar(255) NOT NULL,
	CONSTRAINT "federated_credentials_provider_provider_user_id_unique" UNIQUE("provider","provider_user_id")
);
--> statement-breakpoint
CREATE TABLE "project_contributors" (
	"project_contributor_id" integer,
	"contributor_id" integer,
	"role_id" integer,
	CONSTRAINT "project_contributors_project_contributor_id_contributor_id_pk" PRIMARY KEY("project_contributor_id","contributor_id")
);
--> statement-breakpoint
CREATE TABLE "project_tags" (
	"project_tags_id" integer,
	"tag_id" integer,
	CONSTRAINT "project_tags_project_tags_id_tag_id_pk" PRIMARY KEY("project_tags_id","tag_id")
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"project_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "projects_project_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" varchar(150) NOT NULL,
	"short_description" varchar(250) NOT NULL,
	"long_description" varchar NOT NULL,
	"tier" integer,
	"voyage" integer,
	"main_image_url" varchar(255),
	"githubRepo" varchar(100),
	"updatedAt" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "roles" (
	"role_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "roles_role_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(50) NOT NULL,
	CONSTRAINT "roles_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "tags" (
	"tag_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "tags_tag_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(50) NOT NULL,
	CONSTRAINT "tags_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"user_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_user_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"display_name" varchar(256),
	"email" varchar,
	"password" varchar(255),
	"firstname" varchar(255),
	"lastname" varchar(255),
	"bio" varchar,
	"avatar_url" varchar(255),
	"github_url" varchar(255),
	"updatedAt" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"deletedAt" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "federated_credentials" ADD CONSTRAINT "federated_credentials_federated_user_id_users_user_id_fk" FOREIGN KEY ("federated_user_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_contributors" ADD CONSTRAINT "project_contributors_project_contributor_id_projects_project_id_fk" FOREIGN KEY ("project_contributor_id") REFERENCES "public"."projects"("project_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_contributors" ADD CONSTRAINT "project_contributors_contributor_id_users_user_id_fk" FOREIGN KEY ("contributor_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_contributors" ADD CONSTRAINT "project_contributors_role_id_roles_role_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("role_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_tags" ADD CONSTRAINT "project_tags_project_tags_id_projects_project_id_fk" FOREIGN KEY ("project_tags_id") REFERENCES "public"."projects"("project_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_tags" ADD CONSTRAINT "project_tags_tag_id_tags_tag_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("tag_id") ON DELETE no action ON UPDATE no action;