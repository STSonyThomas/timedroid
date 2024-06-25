"use client"
import { useAuthStore } from "@/store/UserAuthStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from './Loading.module.css';

export default function Home() {
  const userLogin = useAuthStore((state)=>state.user);
  const Router = useRouter();
  useEffect(() => {
    if (!userLogin) {
      
      setTimeout(()=>Router.push("/login"),3000)
      console.log("This is the home speaking");
      console.log(userLogin);
    }else{
        Router.push("/userHome");
    }
  }, [userLogin,Router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 text-black">
     <div className={styles.loader}>
      {/* <img src="/placeholder/url" alt="logo" className={styles.logo} /> */}
      <div className={styles.textWrapper}>
        <span className={styles.letter}>H</span>
        <span className={styles.letter}>u</span>
        <span className={styles.letter}>r</span>
        <span className={styles.letter}>u</span>
        <span className={styles.letter}>n</span>
        <span className={styles.letter}> </span>
        <span className={styles.letter}>I</span>
        <span className={styles.letter}>n</span>
        <span className={styles.letter}>d</span>
        <span className={styles.letter}>i</span>
        <span className={styles.letter}>a</span>
      </div>
    </div>
    </main>
  );
}
