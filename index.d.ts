/** EXT runtime module. */
declare namespace ext.runtime {

  /** Platform information. */
  export interface PlatformInfo {
    /** Operating system. */
    os: 'mac' | 'windows' | 'linux'
    /** CPU architecture. */
    arch: 'arm' | 'arm64' | 'x86-32' | 'x86-64'
  }

  /** Extension update information. */
  export interface ExtensionUpdate {
    /** Version string. */
    version: string
    /** User friendly version name if available. */
    version_name: string | undefined
  }

  /** Update check return value. */
  export interface UpdateCheck {
    /** Status of the update check. */
    status: 'no_update' | 'update_available'
    /** Update information. */
    details: ExtensionUpdate | undefined
  }

  /** Module state. */
  export interface ModuleState {
    /** Module ID. */
    id: string
    /** Module install path if available. */
    path: string | undefined
  }

  /** Event handler. */
  interface EventHandler<Listener> {
    /**
     * Register listener.
     * @param listener Listener to invoke.
     */
    addListener: (listener: Listener) => void
    /**
     * Unregister listener.
     * @param listener Listener to unregister.
     */
    removeListener: (listener: Listener) => void
  }

  /** Get extension manifest. */
  export function getManifest(): Promise<any>

  /** Get platform information. */
  export function getPlatformInfo(): Promise<PlatformInfo>

  /** Reload extension. */
  export function reload(): Promise<void>

  /** Check for extension updates. */
  export function requestUpdateCheck(): Promise<UpdateCheck>

  /** Get all loaded module ID's. */
  export function getModules(): Promise<string[]>

  /** Get all granted permissions for all modules. */
  export function getPermissions(): Promise<{[module: string]: string[]}>
  
  /** Called when the extension is installed. */
  export const onInstall: EventHandler<() => void>

  /** Called before the extension is uninstalled. */
  export const onUninstall: EventHandler<() => void>

  /** Called when the extension is enabled. */
  export const onEnable: EventHandler<() => void>

  /** Called when the extension is disabled. */
  export const onDisable: EventHandler<() => void>

  /** Called when an extension update is available. */
  export const onUpdateAvailable: EventHandler<(details: ExtensionUpdate) => void>

  /** Called when a permission has been granted. */
  export const onPermissionGrant: EventHandler<(moduleID: string, permissionKey: string) => void>

  /** Called when a permission has been revoked. */
  export const onPermissionRevoke: EventHandler<(moduleID: string, permissionKey: string) => void>
  
  /** Called when a module has been loaded. */
  export const onModuleLoad: EventHandler<(module: ModuleState) => void>

  /** Called when a module has been unloaded. */
  export const onModuleUnload: EventHandler<(module: ModuleState) => void>

  /** Called when an extension is clicked in the dashboard. */
  export const onExtensionClick: EventHandler<() => void>

}
