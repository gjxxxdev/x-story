// hooks/useGuardedNavigate.ts
import { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";

export function useGuardedNavigate() {
    const navigation = useNavigation();

    const preNavigateCheck = useCallback(async () => {
        await new Promise((r) => setTimeout(r, 300));
    }, []);

    const navigate = useCallback(
        (...args: any[]) => {
            (async () => {
                // 防呆：確保真的有 navigate
                // @ts-ignore
                const nav: any = navigation;
                if (typeof nav?.navigate !== "function") {
                    console.warn("⚠️ 無效的 navigation 物件，是否在 NavigationContainer 外呼叫？");
                    return;
                }
                await preNavigateCheck();
                nav.navigate(...args);
            })();
        },
        [navigation, preNavigateCheck]
    );

    return { navigate } as const; // ← 明確回傳一個有 .navigate 的物件
}
