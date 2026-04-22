import {
    Sparkles, Smartphone, Globe, Palette, Brain, ShoppingCart, Heart, Zap, Database, Shield,
    Code, Layout, Server, Monitor, Cpu, Cloud, Lock, Search, BarChart, Camera
} from "lucide-react"

export const iconMap: Record<string, any> = {
    Sparkles, Smartphone, Globe, Palette, Brain, ShoppingCart, Heart, Zap, Database, Shield,
    Code, Layout, Server, Monitor, Cpu, Cloud, Lock, Search, BarChart, Camera
}

export const getIcon = (name: string) => {
    return iconMap[name] || Sparkles
}

export const iconNames = Object.keys(iconMap)
