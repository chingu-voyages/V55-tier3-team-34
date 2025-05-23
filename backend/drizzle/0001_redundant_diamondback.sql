ALTER TABLE "federated_credentials" RENAME COLUMN "user_id" TO "federated_user_id";--> statement-breakpoint
ALTER TABLE "federated_credentials" DROP CONSTRAINT "federated_credentials_user_id_users_user_id_fk";
--> statement-breakpoint
ALTER TABLE "federated_credentials" ADD CONSTRAINT "federated_credentials_federated_user_id_users_user_id_fk" FOREIGN KEY ("federated_user_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;