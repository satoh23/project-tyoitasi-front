import React from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { AccountConfirm } from "../../api/verify-email/accountConfirm";
import Layout from "../../components/layout/Layout";

const VerifyEmail: React.FC = () => {
  const router = useRouter();
  const { key } = router.query;
  let isSuccessConfirm: boolean | null = null;
  useEffect(() => {
    let isSuccess = AccountConfirm(key);
    if (isSuccess) {
      isSuccessConfirm = true;
    }
  }, [key]);

  if (isSuccessConfirm === null) {
    <Layout>
      <div className="text-2xl font-bold text-gray-400 text-center">
        <div>確認中です...</div>
        <div className="mt-12">
          しばらく待っても確認が完了しない場合は運営まで連絡してください。
        </div>
      </div>
    </Layout>;
  }
  return (
    <Layout>
      <div className="text-2xl font-bold text-gray-400 text-center">
        確認が完了しました！
      </div>
    </Layout>
  );
};

export default VerifyEmail;
