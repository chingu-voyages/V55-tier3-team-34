CREATE TABLE "federated_credentials" (
	"federated_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "federated_credentials_federated_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" integer,
	"provider" varchar(50) NOT NULL,
	"provider_user_id" varchar(255) NOT NULL,
	CONSTRAINT "federated_credentials_provider_provider_user_id_unique" UNIQUE("provider","provider_user_id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"user_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_user_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"firstname" varchar(256),
	"lastname" varchar(256),
	"email" varchar NOT NULL,
	"bio" varchar,
	"avatar_url" varchar(255),
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "federated_credentials" ADD CONSTRAINT "federated_credentials_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;